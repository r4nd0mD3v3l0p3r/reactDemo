using MongoDB.Driver;

namespace reactDemo.Core.Services.Mongo

{
    public interface IDBInitializer
    {
        IMongoDatabase GetDatabase();
    }
}