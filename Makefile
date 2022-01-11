# gitbook document start
.PHONY: book.start
book.start:
		cd docs && gitbook serve . ../dist

# gitbook document build
.PHONY: book.build
book.build:
		cd docs && gitbook build . ../dist

