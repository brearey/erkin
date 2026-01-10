zip:
	zip -r deploy/erkin_v$(version).zip . -x "Makefile" ".git/*" "deploy/*" ".gigaide/*" ".idea/*" ".gitignore"