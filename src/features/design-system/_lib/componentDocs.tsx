import { Button, ButtonLink } from '@/components/ui/Button';
import { Card, CardLink } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';
import { Heading } from '@/components/ui/Heading';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Input, Textarea } from '@/components/ui/Input';
import { Link } from '@/components/ui/Link';
import {
  MarginNote,
  MarginNoteAnchor,
  MarginNoteGroup,
} from '@/components/ui/MarginNote';
import { Prose } from '@/components/ui/Prose';
import { Stack } from '@/components/ui/Stack';
import { Tag } from '@/components/ui/Tag';
import { Text } from '@/components/ui/Text';
import { VisuallyHidden } from '@/components/ui/VisuallyHidden';
import type { ComponentDocData } from '../_components/ComponentDoc/ComponentDoc';
import { ModalDemo } from '../_components/demos/ModalDemo';
import { TabsDemo } from '../_components/demos/TabsDemo';
import { ToastDemo } from '../_components/demos/ToastDemo';
import { TooltipDemo } from '../_components/demos/TooltipDemo';
import ex from '../_shared/Example/Example.module.css';

function CircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function MarginNoteSample() {
  return (
    <Prose>
      <MarginNoteGroup>
        <p>
          연결 텍스트는{' '}
          <MarginNoteAnchor note="ds-why">왜 그렇게 했는지</MarginNoteAnchor>를
          짧게 적은 메모와 이어집니다.
        </p>
        <MarginNote id="ds-why">
          넓은 영역에서는 본문 오른쪽에 항상 보이고, 좁으면 눌렀을 때 문단
          아래에 펼쳐집니다.
        </MarginNote>
      </MarginNoteGroup>
    </Prose>
  );
}

export interface ComponentGroup {
  id: string;
  title: string;
  docs: ComponentDocData[];
}

/**
 * src/components/ui 컴포넌트 문서. 새 컴포넌트를 만들면 여기에도 추가한다.
 * 예시는 실제 컴포넌트를 그대로 쓰고, 상호작용 예시는 _components/demos의 클라이언트 컴포넌트다.
 */
export const COMPONENT_GROUPS: ComponentGroup[] = [
  {
    id: 'components-typography',
    title: '글자',
    docs: [
      {
        id: 'component-text',
        name: 'Text',
        summary: '텍스트 스타일(variant)과 색(tone)을 고르는 기본 글자.',
        props: [
          ['variant', '텍스트 스타일 13개 (위 「텍스트 스타일」)'],
          ['tone', 'primary · secondary · tertiary · accent'],
          ['as', '렌더링 태그 (p · span · div 등)'],
        ],
        notes: [
          '크기 토큰을 직접 쓰지 않고 이 컴포넌트나 composes로 텍스트 스타일을 쓴다.',
        ],
        example: (
          <div className={ex.row}>
            <Text>primary</Text>
            <Text tone="secondary">secondary</Text>
            <Text tone="tertiary">tertiary</Text>
            <Text tone="accent">accent</Text>
          </div>
        ),
      },
      {
        id: 'component-heading',
        name: 'Heading',
        summary: '문서 구조(level)와 보이는 크기(variant)를 따로 정하는 제목.',
        props: [
          ['level', '1~6 (h1~h6)'],
          ['variant', '생략하면 level별 기본 스타일'],
        ],
        notes: [
          '헤딩 순서(h1 → h2 → h3)를 건너뛰지 않는다. 크기가 필요하면 variant로 바꾼다.',
        ],
        example: (
          <div className={ex.stack}>
            <Heading level={4}>h4 기본 (headingSm)</Heading>
            <Heading level={4} variant="headingLg">
              h4 + headingLg
            </Heading>
          </div>
        ),
      },
      {
        id: 'component-prose',
        name: 'Prose',
        summary: '프로젝트 글처럼 긴 본문의 문단·목록·코드 간격을 맞춘다.',
        props: [],
        notes: ['MDX 본문을 감싼다. 안쪽 요소에 따로 여백을 주지 않는다.'],
        example: (
          <Prose>
            <p>첫 문단입니다. 본문 글자 크기와 줄 높이를 씁니다.</p>
            <ul>
              <li>목록 항목</li>
              <li>문단 사이 간격이 일정합니다</li>
            </ul>
          </Prose>
        ),
      },
      {
        id: 'component-visually-hidden',
        name: 'VisuallyHidden',
        summary: '화면에는 보이지 않고 스크린리더만 읽는 글자.',
        props: [],
        notes: [
          '아이콘만 있는 요소의 이름, 「(새 탭에서 열림)」 같은 보조 설명에 쓴다.',
        ],
        example: (
          <Text>
            아래에 숨긴 글자가 있어요
            <VisuallyHidden> (스크린리더만 읽는 문장)</VisuallyHidden>
          </Text>
        ),
      },
    ],
  },
  {
    id: 'components-layout',
    title: '배치',
    docs: [
      {
        id: 'component-container',
        name: 'Container',
        summary:
          '페이지·본문 최대 폭과 좌우 여백(--layout-gutter). 안쪽이 컨테이너 쿼리 기준이 된다.',
        props: [
          ['width', 'page (--layout-page-max) · prose (--layout-prose-max)'],
          ['as', 'div · main · section · article · header · footer'],
        ],
        notes: [
          '페이지의 main에는 id="main", tabIndex={-1}을 붙인다 (본문 바로가기).',
        ],
        example: (
          <Container width="prose">
            <Text tone="secondary">prose 폭 안의 글자</Text>
          </Container>
        ),
      },
      {
        id: 'component-stack',
        name: 'Stack',
        summary: '간격 토큰으로 요소를 세로·가로로 쌓는다.',
        props: [
          ['direction', 'column · row'],
          ['gap', '간격 토큰 이름 (8 → --spacing-8)'],
          ['rowFrom', '480 · 768 · 832: 컨테이너 폭이 이 이상이면 가로로'],
          ['align · justify · wrap', 'flex 정렬'],
        ],
        notes: [],
        example: (
          <Stack gap="12" rowFrom={480}>
            <Button variant="secondary" type="button">
              하나
            </Button>
            <Button variant="secondary" type="button">
              둘
            </Button>
            <Button variant="secondary" type="button">
              셋
            </Button>
          </Stack>
        ),
      },
      {
        id: 'component-divider',
        name: 'Divider',
        summary: '가로(<hr>)·세로(role="separator") 구분선.',
        props: [
          ['orientation', 'horizontal · vertical'],
          ['decorative', '의미 없는 장식 선이면 보조기기에서 숨긴다'],
        ],
        notes: [],
        example: (
          <div className={ex.stack}>
            <Text>위 문단</Text>
            <Divider />
            <div className={ex.row}>
              <Text as="span">왼쪽</Text>
              <Divider orientation="vertical" decorative />
              <Text as="span">오른쪽</Text>
            </div>
          </div>
        ),
      },
      {
        id: 'component-card',
        name: 'Card · CardLink',
        summary: '목록 항목 상자. CardLink는 카드 전체가 링크다.',
        props: [
          ['as (Card)', 'div · article · li'],
          ['href (CardLink)', '외부 주소면 새 탭으로 열고 보조기기에 알린다'],
        ],
        notes: [
          'CardLink 안에 다른 링크·버튼을 넣지 않는다. hover에 살짝 들린다 (움직임 줄이기에서는 그림자만).',
        ],
        example: (
          <div className={ex.stack}>
            <Card as="article">
              <Heading level={4}>정적 카드</Heading>
              <Text tone="secondary">목록 항목을 담는 상자</Text>
            </Card>
            <CardLink href="/projects">
              <Heading level={4}>링크 카드</Heading>
              <Text tone="secondary">카드 전체가 /projects로 가는 링크</Text>
            </CardLink>
          </div>
        ),
      },
      {
        id: 'component-margin-note',
        name: 'MarginNote',
        summary: '본문 특정 글자에 연결된 「왜 그렇게 했는지」 메모.',
        props: [
          ['MarginNoteAnchor note', '연결할 메모 id'],
          ['MarginNote id', '메모 id'],
        ],
        notes: [
          '넓으면(컨테이너 832px 이상) 본문 옆, 좁으면 연결 글자를 눌러 문단 아래에 펼친다.',
        ],
        example: <MarginNoteSample />,
      },
    ],
  },
  {
    id: 'components-action',
    title: '동작',
    docs: [
      {
        id: 'component-button',
        name: 'Button · ButtonLink',
        summary: '누르는 동작은 Button, 이동은 같은 모양의 ButtonLink.',
        props: [
          ['variant', 'primary · secondary · ghost'],
          ['size', 'sm · md'],
          ['aria-disabled', '준비 중인 기능: 포커스는 받고 동작하지 않는다'],
        ],
        notes: [
          '터치 기기에서 최소 44px. 누르면 살짝 줄어든다 (움직임 줄이기에서는 그대로).',
        ],
        example: (
          <div className={ex.stack}>
            <div className={ex.row}>
              <Button type="button">Primary</Button>
              <Button variant="secondary" type="button">
                Secondary
              </Button>
              <Button variant="ghost" type="button">
                Ghost
              </Button>
              <Button size="sm" type="button">
                Small
              </Button>
            </div>
            <div className={ex.row}>
              <Button type="button" aria-disabled="true">
                준비 중
              </Button>
              <ButtonLink href="/contact" variant="secondary">
                연락처로 가기
              </ButtonLink>
            </div>
          </div>
        ),
      },
      {
        id: 'component-icon-button',
        name: 'IconButton',
        summary: '글자 없이 아이콘만 있는 버튼.',
        props: [
          ['aria-label', '필수: 버튼 이름'],
          ['variant', 'ghost · surface'],
        ],
        notes: ['보이는 크기는 36px이지만 터치 영역은 44px로 넓다.'],
        example: (
          <div className={ex.row}>
            <IconButton aria-label="원 (ghost)" type="button">
              <Icon>
                <CircleIcon />
              </Icon>
            </IconButton>
            <IconButton
              aria-label="원 (surface)"
              variant="surface"
              type="button"
            >
              <Icon>
                <CircleIcon />
              </Icon>
            </IconButton>
          </div>
        ),
      },
      {
        id: 'component-link',
        name: 'Link',
        summary: '본문 링크. 외부 주소는 새 탭·rel을 자동으로 붙인다.',
        props: [['variant', 'inline (포인트색) · plain (글자색 상속)']],
        notes: ['새 탭으로 열리면 「(새 탭에서 열림)」을 보조기기에 알린다.'],
        example: (
          <div className={ex.row}>
            <Link href="/about">내부 링크</Link>
            <Link href="https://github.com/rangggu">외부 링크</Link>
          </div>
        ),
      },
      {
        id: 'component-icon',
        name: 'Icon',
        summary: 'currentColor로 그리는 SVG 아이콘 상자.',
        props: [
          ['size', 'sm (16) · md (20) · lg (24)'],
          ['label', '의미 있는 아이콘이면 대체 텍스트, 없으면 장식으로 숨긴다'],
        ],
        notes: [],
        example: (
          <div className={ex.row}>
            <Icon size="sm">
              <CircleIcon />
            </Icon>
            <Icon>
              <CircleIcon />
            </Icon>
            <Text as="span" tone="accent">
              <Icon size="lg" label="원">
                <CircleIcon />
              </Icon>
            </Text>
          </div>
        ),
      },
    ],
  },
  {
    id: 'components-input',
    title: '입력',
    docs: [
      {
        id: 'component-input',
        name: 'Input · Textarea',
        summary: '라벨·설명·오류를 자동으로 연결하는 입력.',
        props: [
          ['label', '필수 (hideLabel로 숨김)'],
          ['description', '입력 아래 보조 설명 (aria-describedby)'],
          ['error', '오류 메시지 (aria-invalid, 설명보다 먼저 읽힘)'],
        ],
        notes: ['터치 영역 44px. 오류 테두리는 --color-border-danger.'],
        example: (
          <div className={`${ex.stack} ${ex.narrow}`}>
            <Input label="이름" placeholder="김규리" />
            <Input
              label="이메일"
              type="email"
              description="답장을 받을 주소예요."
              defaultValue="hello@"
              error="이메일 형식이 아니에요."
            />
            <Textarea label="물어볼 내용" rows={3} />
          </div>
        ),
      },
    ],
  },
  {
    id: 'components-display',
    title: '표시',
    docs: [
      {
        id: 'component-tag',
        name: 'Tag',
        summary: '프로젝트 태그·기술 분류·상태를 담는 정적 칩.',
        props: [
          ['tone', 'neutral · accent'],
          ['size', 'sm · md'],
          ['as', 'span · li'],
        ],
        notes: ['누를 수 없는 요소다. 누르는 칩이 필요하면 Button을 쓴다.'],
        example: (
          <div className={ex.row}>
            <Tag>React</Tag>
            <Tag tone="accent">대표 프로젝트</Tag>
            <Tag size="sm">TypeScript</Tag>
            <Tag size="sm" tone="accent">
              진행 중
            </Tag>
          </div>
        ),
      },
      {
        id: 'component-tabs',
        name: 'Tabs',
        summary:
          'Tabs · TabList · Tab · TabPanel로 조합하는 탭 (WAI-ARIA, 자동 활성).',
        props: [
          [
            'defaultValue / value',
            '처음 선택(비제어) / 선택 값(제어, onValueChange)',
          ],
          ['TabList aria-label', '탭 목록 이름'],
          ['Tab · TabPanel value', '탭과 패널을 잇는 값'],
        ],
        notes: [
          '←·→·Home·End로 이동하면 바로 선택된다. 선택된 탭만 Tab 순서에 들어간다. 넘치면 가로로 민다.',
        ],
        example: <TabsDemo />,
      },
      {
        id: 'component-tooltip',
        name: 'Tooltip',
        summary: '포커스할 수 있는 요소에 붙이는 짧은 보조 설명.',
        props: [
          ['content', '설명 내용'],
          ['placement', 'top · bottom (공간이 없으면 뒤집고 화면 안으로 민다)'],
        ],
        notes: [
          '마우스 hover·키보드 포커스·터치 길게 누르기로 보이고 Esc로 닫힌다.',
          '꼭 필요한 정보나 버튼 이름을 툴팁에만 두지 않는다 (이름은 aria-label).',
        ],
        example: <TooltipDemo />,
      },
    ],
  },
  {
    id: 'components-overlay',
    title: '오버레이·알림',
    docs: [
      {
        id: 'component-dialog',
        name: 'Dialog · BottomSheet',
        summary:
          '네이티브 <dialog> 모달. 가운데 Dialog, 화면 아래 BottomSheet.',
        props: [
          [
            'open · onClose',
            '부모가 열고 닫는다. Esc·바깥 누르기·닫기 버튼이 onClose를 부른다',
          ],
          ['title · description', '제목(h2)과 설명, aria로 연결'],
          ['footer', '아래 버튼 영역'],
          ['size (Dialog)', 'sm · md · lg'],
        ],
        notes: [
          '컴포넌트가 기기를 나누지 않는다. 데스크톱 Dialog, 폰 BottomSheet처럼 쓰는 쪽이 고른다.',
          '열린 동안 배경 스크롤이 잠기고, 닫으면 연 요소로 포커스가 돌아간다.',
        ],
        example: <ModalDemo />,
      },
      {
        id: 'component-toast',
        name: 'Toast',
        summary: 'toast(message, { tone })로 띄우는 짧은 알림.',
        props: [
          ['tone', 'neutral · success · danger (✓ · ! 아이콘)'],
          ['duration', '자동으로 사라지기까지 (기본 4초)'],
        ],
        notes: [
          '표시 영역(Toaster)은 루트 레이아웃에 있다. aria-live로 알리고, 모달이 열려 있으면 그 안에 보인다.',
          '마우스를 올리거나 포커스하면 멈춘다. 알림에만 있는 정보를 두지 않는다.',
        ],
        example: <ToastDemo />,
      },
    ],
  },
];
