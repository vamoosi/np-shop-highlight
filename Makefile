VERSION  := $(shell jq -r .version  package.json)
NAME     := $(shell jq -r .name     package.json)
HOME_URL := $(shell jq -r .homepage package.json)
AUTHOR   := $(shell jq -r .author   package.json | sed 's/"/\\"/g')

JS_FILES     := $(shell find src -type f -name '*.ts' -o -name '*.svelte')

CWD   := $(shell pwd)
DIST  := $(CWD)/dist
BUILD := $(CWD)/out/compile
STAGE := $(CWD)/out/stage

dist: $(DIST)/np-shop-highlight-v$(VERSION).zip

build: $(BUILD)/active-tab.js $(BUILD)/settings-menu.js

stage: build
	@echo "Staging Project"
	@mkdir -p $(STAGE)
	@rm -rf $(STAGE)/*
	@cp -rt $(STAGE) \
		$(BUILD)/* \
		res \
		tpl/*
	@jq -c ". \
		| .version = \"$(VERSION)\" \
		| .homepage_url = \"$(HOME_URL)\" \
		| .author = $(AUTHOR)" \
		tpl/manifest.json > $(STAGE)/manifest.json


$(DIST)/np-shop-highlight-v$(VERSION).zip: stage
	@echo "Packing $@"
	@mkdir -p $(DIST)
	@rm -f $(DIST)/$(NAME)-$(VERSION).zip
	@cd $(STAGE) && zip -r $(DIST)/$(NAME)-$(VERSION).zip *

$(BUILD)/%.js: $(JS_FILES)
	@echo "Compiling Project"
	@rm -rf $(BUILD)
	./node_modules/.bin/webpack --config webpack.config.js

tag:
	@if [ "$(TAG)" = "" ]; then \
		echo "TAG value required (TAG=x.x.x)"; \
	else \
		jq ". | .version = \"$(TAG)\"" package.json | sponge package.json; \
		git add package.json; \
		git commit -m 'version bump'; \
		git tag v$(TAG); \
		git push; \
		git push --tag; \
	fi