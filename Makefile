# gitbook document start
book.start:
		cd docs && gitbook serve . ../dist

# gitbook document build
book.build:
		cd docs && gitbook build . ../dist

