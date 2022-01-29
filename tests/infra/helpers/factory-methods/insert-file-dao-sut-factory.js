const InsertFileDAO = require('../../../../src/infra/helpers/dao/insert-file-dao');

const DependenciesFactory = require('../factories/insert-file-dao-dependencies-factory');

const {
  INSERT_FILE_DAO_SINGLE_TRANSACTION_SUT_THROWING_ERROR,
} = require('../constants');

module.exports = class SutFactory {
  create(type) {
    this.dependencies = new DependenciesFactory().create();

    if (type === INSERT_FILE_DAO_SINGLE_TRANSACTION_SUT_THROWING_ERROR) {
      this.dependencies.databaseDriverTemplateMethodsSpy.singleTransaction =
        async (_client, _statement, _values) => {
          return Promise.reject(new Error());
        };
      this.sut = new InsertFileDAO({
        databaseDriverTemplateMethods:
          this.dependencies.databaseDriverTemplateMethodsSpy,
      });
    } else {
      this.sut = new InsertFileDAO({
        databaseDriverTemplateMethods:
          this.dependencies.databaseDriverTemplateMethodsSpy,
      });
    }

    return {
      sut: this.sut,
      ...this.dependencies,
    };
  }
};
