#!/usr/bin/env zsh

# This script run test and bench under Node v4, v5 and v6.

set -e

. ~/.nvm/nvm.sh

echo "\n-------------------------"
echo "| Test under Node.js v4 |"
echo "-------------------------"
nvm use "4.4.5"
npm test

echo "\n-------------------------"
echo "| Test under Node.js v5 |"
echo "-------------------------"
nvm use "5.11.1"
npm test

echo "\n-------------------------"
echo "| Test under Node.js v6 |"
echo "-------------------------"
nvm use "6.2.1"
npm test

echo "\n--------------------"
echo "| All test passed! |"
echo "--------------------"
