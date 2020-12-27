function shouldBehaveLikeGeneratorCopyright (version) {
  describe('should have', function () {
    const _builtOn = {
      generator: 'https://github.com/Techspire/erc20-token-generator',
    };

    it('a generator value', async function () {
      _builtOn.generator.should.be.equal(await this.instance.generator());
    });

    it('a version value', async function () {
      version.should.be.equal(await this.instance.version());
    });
  });
}

module.exports = {
  shouldBehaveLikeGeneratorCopyright,
};
