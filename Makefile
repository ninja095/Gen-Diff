gendiff:
	node bin/gendiff.js -h
publish:
	npm publish --dry-run
lint:
	npx eslint .
install:
	npm ci
fix:
	npx eslint --fix .
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
test-watch:
	npm test -s -- --watch
test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test
