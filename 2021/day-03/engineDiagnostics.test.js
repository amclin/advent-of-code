/* eslint-env mocha */
const { expect } = require('chai')
const { getMostCommon, getLeastCommon, getEpsilon, getGamma, getO2, getCO2, calcPowerConsumption, calcLifeSupport } = require('./engineDiagnostics')

const testData = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010'
]

describe('--- Day 3: Binary Diagnostic ---', () => {
  describe('Part 1', () => {
    describe('getMostCommon()', () => {
      it('finds the most common bit at a position', () => {
        expect(getMostCommon(testData, 0)).to.equal('1')
        expect(getMostCommon(testData, 1)).to.equal('0')
        expect(getMostCommon(testData, 2)).to.equal('1')
        expect(getMostCommon(testData, 3)).to.equal('1')
        expect(getMostCommon(testData, 4)).to.equal('0')
      })
    })
    describe('getLeastCommon()', () => {
      it('finds the least common bit at a position', () => {
        expect(getLeastCommon(testData, 0)).to.equal('0')
        expect(getLeastCommon(testData, 1)).to.equal('1')
        expect(getLeastCommon(testData, 2)).to.equal('0')
        expect(getLeastCommon(testData, 3)).to.equal('0')
        expect(getLeastCommon(testData, 4)).to.equal('1')
      })
    })
    describe('getGamma()', () => {
      it('finds the gamma rate from the provided data using the most common bits in each position', () => {
        expect(getGamma(testData)).to.equal('10110')
      })
    })
    describe('getEpsilon()', () => {
      it('finds the epsilon rate from the provided data using the least common bits in each position', () => {
        expect(getEpsilon(testData)).to.equal('01001')
      })
    })
    describe('calcPowerConsumption', () => {
      it('calculates the power consumption by multiplying the gamma and epsilon rates as decimals', () => {
        expect(calcPowerConsumption('10110', '01001')).to.equal(198)
      })
    })
  })
  describe('Part 2', () => {
    describe('getO2()', () => {
      it('calculates the oxygen generator rating from the provided data', () => {
        expect(getO2(testData)).to.equal('10111')
      })
    })
    describe('getCO2()', () => {
      it('calculates the carbon dioxide scrubber rating from the provided data', () => {
        expect(getCO2(testData)).to.equal('01010')
      })
    })
    describe('calcLifeSupport', () => {
      it('calculates the life support rating by multiplying the O2 and C02 rates rates as decimals', () => {
        expect(calcLifeSupport('10110', '01001')).to.equal(198)
      })
    })
  })
})
