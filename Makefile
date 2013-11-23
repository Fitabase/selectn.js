.PHONY: clean test

STANDALONE := selectn
MOCHAFLAGS ?= --reporter spec

clean:
	@$(RM) -fr node_modules $(STANDALONE).js
	@$(RM) -fr npm-debug.log

$(STANDALONE).js: index.js
	@./node_modules/.bin/browserify --entry $< --outfile $@ --standalone $(STANDALONE) 

test: node_modules $(STANDALONE).js
	@echo Running Node.js tests
	@./node_modules/.bin/mocha $(MOCHAFLAGS)
	@echo Running Browser tests
	@./node_modules/.bin/mocha-phantomjs test/index.browser.html

node_modules: package.json
	@npm prune
	@npm install

release: test $(STANDALONE).js
