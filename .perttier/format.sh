#!/bin/bash

find src \( -name "*.ts" -o -name "*.tsx" -o -name "*.scss" \) -print0 | xargs -0 -I {} sh -c 'prettier --write "{}" 2>/dev/null || true'
