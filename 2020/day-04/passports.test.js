/* eslint-env mocha */
const { expect } = require('chai')
const { parseScan, validate } = require('./passports')

const valid = [
  `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
    byr:1937 iyr:2017 cid:147 hgt:183cm`,
  `hcl:#ae17e1 iyr:2013
    eyr:2024
    ecl:brn pid:760753108 byr:1931
    hgt:179cm`
]

const invalid = [
  `iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
    hcl:#cfa07d byr:1929`,
  `hcl:#cfa07d eyr:2025 pid:166559648
    iyr:2011 ecl:brn hgt:59in`
]

describe('--- Day 4: Passport Processing ---', () => {
  describe('Part 1', () => {
    describe('parseScan()', () => {
      it('parses an individual record into an addressable object', () => {
        const res = parseScan(valid[0])
        expect(res).to.deep.equal({
          ecl: 'gry',
          pid: '860033327',
          eyr: '2020',
          hcl: '#fffffd',
          byr: '1937',
          iyr: '2017',
          cid: '147',
          hgt: '183cm'
        })
      })
    })
    describe('validate()', () => {
      it('verifies all required fields in a passport', () => {
        valid.forEach((scan, idx) => {
          const passport = parseScan(scan)
          // Valid when all required fields
          expect(validate(passport)).to.equal(true)
        })
      })
      it('errors on invalid passports', () => {
        const passport = parseScan(invalid[0])
        expect(() => validate(passport)).to.throw('Missing field hgt')
      })
    })
  })
})
