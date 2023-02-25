gendiff:
	node bin/gendiff.js -h
publish:
	npm publish --dry-run
lint:
	npx eslint .
install:
	npm ci
	npm link
fix:
	npx eslint --fix .
test:
	npm test
test-watch:
	npm test -s -- --watch
test-coverage:
	npm test -- --coverage --coverageProvider=v8
rec:
	asciinema rec

.PHONY: test
