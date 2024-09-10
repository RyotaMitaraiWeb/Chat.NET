namespace Infrastructure.Mongo
{
    public class PunishmentDatabaseSettings
    {
        public string? ConnectionString { get; set; }
        public string DatabaseName { get; set; } = null!;
        public string PunishmentCollectionName { get; set; } = null!;
    }
}
