# Nord fork: Syntax colors = VS Code Dark+, everything else = Nord

## 목표

- Nord 테마를 포크한 뒤 **에디터의 문법 하이라이트(클래스/함수/키워드/문자열 등 글씨 색)**만 **VS Code 기본 `Dark+ (default dark)`**와 동일하게 맞춘다.
- 그 외 **워크벤치/UI 색(`colors`)과 기타 설정은 Nord를 그대로 유지**한다.

## 비목표(Non-goals)

- UI 색/배경색/탭/사이드바/상태바 등 `colors`를 Dark+로 바꾸지 않는다.
- 특정 언어 확장(예: TS/Go/Rust) 전용 커스텀 토큰을 새로 설계하지 않는다(필요하면 별도 작업으로 분리).

## 대상 파일/경로(현재 레포 기준)

- 테마 엔트리: `package.json` → `contributes.themes[0].path`
- 실제 테마 JSON: `themes/nord-color-theme.json`
  - UI/워크벤치 색: `colors`
  - 문법 하이라이트: `tokenColors` (TextMate scope 기반)
  - (있다면) `semanticHighlighting`, `semanticTokenColors` (Semantic Tokens 기반)

## 작업 순서(체크리스트)

- [ ] 1. 현재 Nord 토큰 정의 확인
  - `themes/nord-color-theme.json`의 `tokenColors`(및 존재 시 `semanticTokenColors`) 범위를 파악한다.
- [ ] 2. Dark+ 토큰 색 스냅샷 확보
  - 기준은 VS Code 내장 테마 `Dark+ (default dark)`의 토큰 규칙.
  - 가능한 한 “테마 파일에서 직접 추출”하여 범위/우선순위가 일치하도록 한다.
- [ ] 3. 매핑 전략 결정(권장: 최소 변경)
  - **권장:** Nord의 `colors`는 그대로 두고, `tokenColors`만 Dark+와 동일한 규칙/색으로 교체한다.
  - (선택) Nord에서 이미 존재하는 특정 토큰 규칙을 유지해야 한다면, 충돌 규칙 우선순위를 명시한다(나중 항목이 우선).
- [ ] 4. `tokenColors` 교체/병합 적용
  - `themes/nord-color-theme.json`에서 `tokenColors`만 업데이트한다.
  - `colors` 섹션은 변경하지 않는다.
- [ ] 5. VS Code에서 시각 검증
  - TS/JS, JSON, Markdown, CSS 파일을 열고 다음 토큰이 Dark+와 동일하게 보이는지 확인한다:
    - 키워드, 문자열, 숫자, 주석
    - 함수/메서드 이름, 클래스/타입 이름, 변수/프로퍼티
    - import/export, JSX/TSX 태그/속성
- [ ] 6. 품질 체크(선택)
  - `npm run lint:md`로 문서 린트, `npm run lint:json`로 JSON 린트를 실행한다.
- [ ] 7. 문서화
  - README에 “Nord UI + Dark+ Syntax” 의도와 변경 범위(`colors` 불변, `tokenColors`만 변경)를 명확히 적는다.

## 완료 기준(Acceptance criteria)

- `themes/nord-color-theme.json`에서 **`colors` 값이 변경되지 않고**, 문법 하이라이트만 Dark+와 시각적으로 동일하다.
- 최소 2~3개 언어(예: TS/JS + JSON + Markdown)에서 토큰 색이 Dark+와 같은지 확인했다.

## 다음 액션

- `themes/nord-color-theme.json`의 `tokenColors`/`semanticTokenColors` 존재 여부를 확정하고, Dark+ 기준 스냅샷을 추출해 실제 교체 PR을 진행한다.
