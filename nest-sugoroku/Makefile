.SUFFIXES: .tex .dvi .pdf
.PHONY:all

all: nest_sugoroku.pdf nest_sugoroku2.pdf

.dvi.pdf:
	dvipdfm $<

.tex.dvi:
	platex $<
