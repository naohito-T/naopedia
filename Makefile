# gitbook document build
book.build:
		cd doc && gitbook build . ../docs

# gitbook document start
book.start:
		cd doc && gitbook serve --open
