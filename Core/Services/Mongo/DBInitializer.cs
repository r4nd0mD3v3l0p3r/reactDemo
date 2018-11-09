using Mongo2Go;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactDemo.Core.Services.Mongo
{
    public class DBInitializer : IDisposable, IDBInitializer
    {
        public const string DBName = "reactDemo";
        readonly MongoDbRunner _runner;

        public DBInitializer()
        {
            _runner = MongoDbRunner.Start();

            var client = new MongoClient(_runner.ConnectionString);
            var database = client.GetDatabase(DBName);
        }

        public void Dispose()
        {
            if (_runner != null && !_runner.Disposed)
                _runner.Dispose();
        }
    }
}
