#!/bin/bash
cd /home/kavia/workspace/code-generation/kavia-ai-platform-52844/kavia_ai_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

