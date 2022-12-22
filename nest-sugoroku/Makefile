.SUFFIXES: .tex .dvi .pdf
.PHONY:all

all: nest_sugoroku.pdf

.dvi.pdf:
	dvipdfm $<

.tex.dvi:
	platex $<
