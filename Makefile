# gitbook document start
book.start:
		cd doc && gitbook serve . ../dist

# gitbook document build
book.build:
		cd doc && gitbook build . ../dist

