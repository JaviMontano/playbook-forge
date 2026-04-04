#!/bin/bash
# batch-robustify.sh — Apply robustify.js to multiple playbooks, then verify
NODE=/opt/homebrew/bin/node
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

for f in "$@"; do
  echo "=== $(basename "$f") ==="
  $NODE "$SCRIPT_DIR/robustify.js" "$f"
  echo ""
done

echo "=== VERIFICATION ==="
for f in "$@"; do
  RESULT=$($NODE "$SCRIPT_DIR/verify-spec.js" "$f" 2>&1)
  SCORE=$(echo "$RESULT" | $NODE -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{try{let j=JSON.parse(d);console.log(j.score+' '+(j.passed?'PASS':'FAIL'))}catch(e){console.log('ERROR')}})")
  printf "%-70s %s\n" "$(basename "$f")" "$SCORE"
done
