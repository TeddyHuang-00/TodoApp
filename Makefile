.PHONY = github

github:
	rm -rf dist
	npx vite build --base=/TodoApp/
	cp -r .github dist
	cd dist && \
	git init && \
	git add -A && \
	git commit -m 'deploy at $(shell date)' && \
	git push -f git@github.com:TeddyHuang-00/TodoApp.git main:gh-pages