#!/bin/bash

DNA_LETTERS=("A" "T" "C" "G")
DNA_LINE_LENGTH=6
DATA_FILE="data.csv"
DATA_LINES=300

function generateLetter {

  nanoSecs="$(date +'%N')"
  nanoSecsLength="${#nanoSecs}"
  letterIndex="${nanoSecs:$nanoSecsLength-1:1}"
  dnaLettersLength="${#DNA_LETTERS[@]}"

  while [ "$letterIndex" -ge "$dnaLettersLength" ]; do
    letterIndex=$((letterIndex-dnaLettersLength))
  done;

  echo "${DNA_LETTERS[$letterIndex]}"
}

function generateLine {

  line=""

  for i in $(seq 1 ${DNA_LINE_LENGTH}); do
    line="${line}$(generateLetter)"
  done;

  echo "$line"
}

function generatePayload {

  payload=""

  for i in $(seq 1 ${DNA_LINE_LENGTH}); do

    if [ ! "$i" -eq 1 ]; then
      payload="${payload},"
    fi;

    line="$(generateLine)"
    payload="${payload}\"${line}\""

  done;

  echo "$payload"

}

#------------------------------------------

rm -f "${DATA_FILE}"

for i in $(seq 1 ${DATA_LINES}); do

  generatePayload >> "${DATA_FILE}"

done;