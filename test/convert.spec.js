/* eslint-env mocha */
'use strict'

const convert = require('../src/convert')
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

describe('convert', () => {
  it('handles buffers', () => {
    expect(
      convert('ip4', Buffer.from('c0a80001', 'hex'))
    ).to.eql(
      '192.168.0.1'
    )
  })

  it('handles strings', () => {
    expect(
      convert('ip4', '192.168.0.1')
    ).to.eql(
      Buffer.from('c0a80001', 'hex')
    )
  })

  describe('.toBuffer', () => {
    it('defaults to hex conversion', () => {
      expect(
        convert.toBuffer('ws', 'c0a80001')
      ).to.eql(
        Buffer.from([192, 168, 0, 1])
      )
    })
  })

  describe('.toString', () => {
    it('throws on inconsistent ipfs links', () => {
      const valid = Buffer.from('03221220d52ebb89d85b02a284948203a62ff28389c57c9f42beec4ec20db76a68911c0b', 'hex')
      expect(
        () => convert.toString('ipfs', valid.slice(0, valid.length - 8))
      ).to.throw(
        /inconsistent length/
      )
    })

    it('defaults to hex conversion', () => {
      expect(
        convert.toString('ws', Buffer.from([192, 168, 0, 1]))
      ).to.eql(
        'c0a80001'
      )
    })
  })
})
