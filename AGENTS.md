# AGENTS

이 레포에서 Codex(에이전트)가 작업할 때 따라야 할 규칙을 정리합니다.

## MCP 알림 규칙

- 작업이 끝나면 `notify/show`를 호출해 알림을 띄운다.
- 성공 시 제목은 `Codex 완료`, 메시지에는 요약 1~2줄 + 다음 행동(있다면)을 넣는다.
- 실패/중단 시 제목은 `Codex 실패`, 메시지에는 실패 원인 요약을 넣는다.

## MCP 알림 서버 설정(로컬)

`~/.codex/config.toml`에 아래를 추가한다.

```toml
[mcp_servers.notify]
url = "http://127.0.0.1:17999/sse"
enabled = true
```

- systemd 사용자 서비스 `mcp-notify.service`가 실행 중이어야 한다.
- 만약 `/mcp`가 400 에러를 반환하면 `/sse`를 사용한다.

## 테스트(최소 확인)

- 간단 확인: `notify/show` 호출로 `hello` 알림을 띄운다.

## 레포 작업 메모

- VS Code 테마 엔트리: `package.json` → `contributes.themes`
- 테마 JSON: `themes/nord-color-theme.json`
  - UI/워크벤치: `colors`
  - 문법 하이라이트: `tokenColors`(TextMate), `semanticTokenColors`(Semantic Tokens)

## Skills

Skill은 Codex의 로컬 워크플로/지식 묶음입니다. 사용 가능한 skill 목록과 사용 규칙은 Codex 세션 컨텍스트에 따릅니다.
