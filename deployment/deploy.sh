#!/usr/bin/env bash
set -Eeuo pipefail

APP_ROOT="/var/www/memasevich"
RELEASES="$APP_ROOT/releases"
STAMP="$(date -u +%Y%m%d%H%M%S)"
NEW_RELEASE="$RELEASES/$STAMP"
BUILD_DIR="${BUILD_DIR:-dist/client}"

test -f package.json || { echo "Run this script from the repository root." >&2; exit 1; }
npm ci
npm run build
test -f "$BUILD_DIR/index.html" || { echo "Build output missing: $BUILD_DIR/index.html" >&2; exit 1; }

sudo install -d -m 0755 "$RELEASES" "$NEW_RELEASE"
sudo rsync -a --delete "$BUILD_DIR/" "$NEW_RELEASE/"
sudo chown -R root:www-data "$NEW_RELEASE"
sudo find "$NEW_RELEASE" -type d -exec chmod 0755 {} +
sudo find "$NEW_RELEASE" -type f -exec chmod 0644 {} +
sudo ln -sfn "$NEW_RELEASE" "$APP_ROOT/.next-current"
sudo mv -Tf "$APP_ROOT/.next-current" "$APP_ROOT/current"
sudo nginx -t
sudo systemctl reload nginx
curl --fail --silent --show-error --location --max-time 15 https://memasevich.ru/ >/dev/null

sudo find "$RELEASES" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' | sort -nr | tail -n +6 | cut -d' ' -f2- | xargs -r sudo rm -rf
echo "Deployed $STAMP"
