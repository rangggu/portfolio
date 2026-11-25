import { describe, expect, it } from 'vitest';

import {
  buildCameraTrack,
  cameraAnchorAt,
  cameraAt,
  frameAtPoint,
  scrollForAnchor,
  scrollForFrame,
  scrollToReveal,
  type FrameRect,
} from './cameraTrack';

const VIEWPORT = { width: 1000, height: 800 };
const HOLD = 240;

// 지도 축소판: 첫 화면 위, 소개·경력 한 줄, 연락처는 경력 아래
const RECTS: FrameRect[] = [
  { id: 'hero', x: 100, y: 0, width: 800, height: 800 },
  { id: 'about', x: 100, y: 800, width: 800, height: 800 },
  { id: 'career', x: 940, y: 800, width: 800, height: 2000 },
  { id: 'contact', x: 940, y: 2800, width: 800, height: 800 },
];

const track = buildCameraTrack(RECTS, VIEWPORT, { holdLength: HOLD });
/** 경력(긴 프레임) 맨 위의 스크롤 위치 */
const CAREER = 2360;

describe('buildCameraTrack', () => {
  it('프레임마다 follow · hold · move 구간을 잇고 마지막 프레임은 follow만 둔다', () => {
    expect(
      track.segments.map((segment) => `${segment.frameId}:${segment.phase}`),
    ).toEqual([
      'hero:follow',
      'hero:hold',
      'hero:move',
      'about:follow',
      'about:hold',
      'about:move',
      'career:lead',
      'career:follow',
      'career:hold',
      'career:move',
      'contact:follow',
    ]);
  });

  it('구간 길이는 이동 거리와 같고, 프레임 시작 위치가 누적된다', () => {
    // hero: follow 0, hold 240, 아래로 800
    // about: follow 0, hold 240, 오른쪽으로 840
    // career: lead 240(맨 위 너머에서 들어섬), follow 1200, hold 240(끝 너머로 240 더 내려감), 아래로 800 - 240
    expect(track.frameStarts).toEqual({
      hero: 0,
      about: 1040,
      career: CAREER,
      contact: 4360,
    });
    expect(track.length).toBe(4360);
  });

  it('다음 프레임 방향은 가로로 옮겨 가면 오른쪽, 아니면 아래다', () => {
    const moves = track.segments.filter((segment) => segment.phase === 'move');
    expect(moves.map((segment) => segment.nextDirection)).toEqual([
      'down',
      'right',
      'down',
    ]);
  });

  it('화면보다 짧은 프레임은 follow 길이가 0이다', () => {
    expect(track.followLengths.about).toBe(0);
    expect(track.followLengths.career).toBe(1200);
  });

  it('긴 프레임 끝에서 옆 프레임으로는 가로 거리만큼만 스크롤한다', () => {
    const row = buildCameraTrack(
      [
        { id: 'career', x: 0, y: 0, width: 1000, height: 2000 },
        { id: 'projects', x: 1040, y: 0, width: 1000, height: 800 },
      ],
      VIEWPORT,
      { holdLength: HOLD },
    );
    const move = row.segments.find((segment) => segment.phase === 'move');
    expect(move).toMatchObject({
      length: 1040,
      from: { x: 0, y: 1200 + HOLD },
      to: { x: 1040, y: 0 },
      nextDirection: 'right',
    });
  });
});

describe('cameraAt', () => {
  it('맨 위에서는 첫 화면 가운데를 본다', () => {
    expect(cameraAt(track, 0)).toMatchObject({ x: 0, y: 0, frameId: 'hero' });
  });

  it('hold 구간에서는 멈춰 있고 다음 프레임을 알려 준다', () => {
    expect(cameraAt(track, 120)).toMatchObject({
      x: 0,
      y: 0,
      phase: 'hold',
      frameId: 'hero',
      nextFrameId: 'about',
      nextDirection: 'down',
    });
  });

  it('긴 프레임의 hold 구간은 끝 너머로 조금 더 내려간다 (화면 높이 프레임은 멈춰 있다)', () => {
    const end = CAREER + 1200;
    expect(cameraAt(track, end)).toMatchObject({ y: 2000, phase: 'hold' });
    expect(cameraAt(track, end + HOLD / 2)).toMatchObject({
      y: 2000 + HOLD / 2,
      phase: 'hold',
      frameId: 'career',
    });
  });

  it('move 구간은 선형으로 옮겨 가고 절반을 넘으면 다음 프레임이 된다', () => {
    expect(cameraAt(track, 240 + 399)).toMatchObject({
      y: 399,
      frameId: 'hero',
    });
    expect(cameraAt(track, 240 + 400)).toMatchObject({
      y: 400,
      frameId: 'about',
    });
  });

  it('소개에서 경력으로는 오른쪽으로 간다', () => {
    // 경력은 긴 프레임이라 맨 위 너머(800 - 240)로 들어선다
    const middle = cameraAt(track, 1040 + HOLD + 420);
    expect(middle).toMatchObject({ x: 420, y: 680, frameId: 'career' });
  });

  it('긴 프레임의 lead 구간은 맨 위 너머에서 맨 위로 내려온다', () => {
    expect(cameraAt(track, CAREER - HOLD)).toMatchObject({
      y: 560,
      phase: 'lead',
      frameId: 'career',
    });
    expect(cameraAt(track, CAREER - HOLD / 2)).toMatchObject({ y: 680 });
    expect(cameraAt(track, CAREER)).toMatchObject({ y: 800, phase: 'follow' });
  });

  it('긴 프레임은 카메라가 아래로 따라간다', () => {
    expect(cameraAt(track, CAREER + 600)).toMatchObject({
      x: 840,
      y: 1400,
      frameId: 'career',
      phase: 'follow',
    });
  });

  it('범위 밖 스크롤은 끝에 붙인다', () => {
    expect(cameraAt(track, -50)).toMatchObject({ x: 0, y: 0 });
    expect(cameraAt(track, 99999)).toMatchObject({
      x: 840,
      y: 2800,
      frameId: 'contact',
    });
  });

  it('프레임이 없으면 undefined', () => {
    const empty = buildCameraTrack([], VIEWPORT, { holdLength: HOLD });
    expect(cameraAt(empty, 0)).toBeUndefined();
  });
});

describe('cameraAnchorAt · scrollForAnchor', () => {
  it('같은 경로에서는 같은 스크롤 위치로 돌아온다', () => {
    const anchor = cameraAnchorAt(track, CAREER + 300);
    expect(anchor).toEqual({
      frameId: 'career',
      phase: 'follow',
      progress: 0.25,
    });
    expect(anchor && scrollForAnchor(track, anchor)).toBe(CAREER + 300);
  });

  it('프레임 높이가 바뀌어도 프레임 안 진행 비율을 유지한다', () => {
    const anchor = {
      frameId: 'career',
      phase: 'follow',
      progress: 0.5,
    } as const;
    expect(cameraAnchorAt(track, CAREER + 600)).toEqual(anchor);
    const taller = buildCameraTrack(
      RECTS.map((rect) =>
        rect.id === 'career' ? { ...rect, height: 2800 } : rect,
      ),
      VIEWPORT,
      { holdLength: HOLD },
    );
    // follow 2000의 절반
    expect(scrollForAnchor(taller, anchor)).toBe(CAREER + 1000);
  });

  it('구간이 없어지면 그 프레임의 시작으로 간다', () => {
    const short = buildCameraTrack(
      RECTS.map((rect) =>
        rect.id === 'career' ? { ...rect, height: 800 } : rect,
      ),
      VIEWPORT,
      { holdLength: HOLD },
    );
    expect(
      scrollForAnchor(short, {
        frameId: 'career',
        phase: 'follow',
        progress: 0.5,
      }),
    ).toBe(scrollForFrame(short, 'career'));
  });
});

describe('frameAtPoint', () => {
  it('좌표가 들어 있는 프레임을 고른다', () => {
    expect(frameAtPoint(RECTS, { x: 1000, y: 1500 })).toBe('career');
  });

  it('프레임 사이 빈 캔버스면 가장 가까운 프레임을 고른다', () => {
    expect(frameAtPoint(RECTS, { x: 910, y: 900 })).toBe('about');
    expect(frameAtPoint(RECTS, { x: 400, y: 2000 })).toBe('about');
  });
});

describe('scrollToReveal', () => {
  it('지금 보이는 구간이면 스크롤하지 않는다', () => {
    expect(
      scrollToReveal(
        track,
        'career',
        { top: 700, bottom: 740 },
        800,
        CAREER + 300,
      ),
    ).toBe(CAREER + 300);
  });

  it('보이지 않으면 구간을 화면 가운데로 가져온다', () => {
    // 1500 - (800 - 40) / 2 = 1120
    expect(
      scrollToReveal(track, 'career', { top: 1500, bottom: 1540 }, 800, 0),
    ).toBe(CAREER + 1120);
  });

  it('프레임 밖으로는 나가지 않는다', () => {
    expect(
      scrollToReveal(track, 'career', { top: 1950, bottom: 1990 }, 800, 0),
    ).toBe(CAREER + 1200);
    expect(
      scrollToReveal(track, 'career', { top: 10, bottom: 50 }, 800, 4000),
    ).toBe(CAREER);
  });

  it('플로팅 UI가 가리는 곳은 보이지 않는 것으로 친다', () => {
    expect(
      scrollToReveal(
        track,
        'career',
        { top: 310, bottom: 340 },
        800,
        CAREER + 300,
        { insetTop: 80 },
      ),
    ).not.toBe(CAREER + 300);
  });
});
