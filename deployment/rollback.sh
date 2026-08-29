#!/usr/bin/env bash
set -Eeuo pipefail

APP_ROOT="/var/www/memasevich"
RELEASES="$APP_ROOT/releases"
CURRENT="$(readlink -f "$APP_ROOT/current")"
PREVIOUS="$(find "$RELEASES" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' | sort -nr | awk -v current="$CURRENT" '$2 != current {print $2; exit}')"

test -n "$PREVIOUS" || { echo "No previous release found." >&2; exit 1; }
test -f "$PREVIOUS/index.html" || { echo "Previous release is invalid: $PREVIOUS" >&2; exit 1; }
sudo ln -sfn "$PREVIOUS" "$APP_ROOT/.next-current"
sudo mv -Tf "$APP_ROOT/.next-current" "$APP_ROOT/current"
sudo nginx -t
sudo systemctl reload nginx
curl --fail --silent --show-error --location --max-time 15 https://memasevich.ru/ >/dev/null
echo "Rolled back to $PREVIOUS"
