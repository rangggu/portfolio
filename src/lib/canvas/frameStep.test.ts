import { describe, expect, it } from 'vitest';

import { buildCameraTrack, type FrameRect } from './cameraTrack';
import { frameEndScroll, frameStep } from './frameStep';

const VIEWPORT = { width: 1000, height: 800 };
const HOLD = 240;

// 소개(화면 높이) → 경력(긴 프레임) → 프로젝트
type Id = 'about' | 'career' | 'projects';
const RECTS: FrameRect<Id>[] = [
  { id: 'about', x: 100, y: 0, width: 800, height: 800 },
  { id: 'career', x: 940, y: 0, width: 800, height: 2000 },
  { id: 'projects', x: 1780, y: 0, width: 800, height: 800 },
];
const IDS = RECTS.map((rect) => rect.id);
const track = buildCameraTrack(RECTS, VIEWPORT, { holdLength: HOLD });
const careerStart = track.frameStarts.career;
const careerEnd = frameEndScroll(track, 'career'); // 시작 + 1200
const careerPulled = careerEnd + HOLD; // 끝 너머로 더 당길 수 있는 끝

const step = (scrollY: number, delta: number) =>
  frameStep(track, IDS, scrollY, delta);

describe('frameStep', () => {
  it('긴 프레임 안에서는 그대로 스크롤한다', () => {
    expect(step(careerStart + 100, 120)).toEqual({ kind: 'scroll' });
    expect(step(careerStart + 500, -120)).toEqual({ kind: 'scroll' });
    expect(step(careerStart + 200, -120)).toEqual({ kind: 'scroll' });
    expect(step(careerEnd - 200, 120)).toEqual({ kind: 'scroll' });
  });

  it('긴 프레임은 끝에 닿은 뒤에도 더 당길 수 있다', () => {
    expect(step(careerEnd - 50, 120)).toEqual({ kind: 'scroll' });
    expect(step(careerEnd, 120)).toEqual({ kind: 'scroll' });
  });

  it('더 당기는 구간을 넘으려는 입력이면 멈추지 않고 곧장 다음 프레임 맨 위로', () => {
    const toProjects = {
      kind: 'travel',
      frameId: 'projects',
      scroll: track.frameStarts.projects,
    };
    expect(step(careerEnd, 400)).toEqual(toProjects);
    expect(step(careerPulled - 1, 1)).toEqual(toProjects);
  });

  it('스크롤한 뒤 끝까지 여백(48px) 이하만 남으면 넘어간다 (몇 px 남기고 멈추지 않게)', () => {
    expect(step(careerPulled - 48, 8)).toMatchObject({
      kind: 'travel',
      frameId: 'projects',
    });
    expect(step(careerPulled - 100, 40)).toEqual({ kind: 'scroll' });
    expect(step(careerStart - HOLD + 60, -20)).toMatchObject({
      kind: 'travel',
      frameId: 'about',
    });
  });

  it('화면에 다 들어오는 프레임은 아래로 한 번이면 바로 다음 프레임', () => {
    expect(step(track.frameStarts.about, 1)).toEqual({
      kind: 'travel',
      frameId: 'career',
      scroll: careerStart,
    });
  });

  it('긴 프레임은 맨 위에 닿은 뒤에도 더 올릴 수 있다', () => {
    expect(step(careerStart, -120)).toEqual({ kind: 'scroll' });
    expect(step(careerStart - 100, -40)).toEqual({ kind: 'scroll' });
  });

  it('더 올리는 구간을 넘으려는 입력이면 곧장 이전 프레임의 끝으로', () => {
    expect(step(careerStart, -400)).toEqual({
      kind: 'travel',
      frameId: 'about',
      scroll: frameEndScroll(track, 'about'),
    });
    expect(step(track.frameStarts.projects, -1)).toEqual({
      kind: 'travel',
      frameId: 'career',
      scroll: careerEnd,
    });
  });

  it('첫 프레임 맨 위·마지막 프레임은 브라우저에 맡긴다', () => {
    expect(step(0, -40)).toEqual({ kind: 'scroll' });
    expect(step(track.frameStarts.projects, 40)).toEqual({ kind: 'scroll' });
  });

  it('프레임 사이 구간(스크롤바로 온 경우)은 그대로 둔다', () => {
    const move = track.segments.find(
      (segment) => segment.frameId === 'career' && segment.phase === 'move',
    );
    expect(move).toBeDefined();
    expect(step((move?.start ?? 0) + 10, 40)).toEqual({ kind: 'scroll' });
  });

  it('더 당기는 구간 끝에서 아래로 가면 다음 프레임으로', () => {
    expect(step(careerPulled - 10, 10)).toMatchObject({
      kind: 'travel',
      frameId: 'projects',
    });
  });
});
