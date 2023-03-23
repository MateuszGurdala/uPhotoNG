namespace uPhotoNG.Models.Structs
{
    public struct FileHttpData
    {
        public string album { get; set; }
        public string place { get; set; }
        public string tags { get; set; }
        public string base64 { get; set; }
        public string MIMEType { get; set; }
        public string fileName { get; set; }
        public string title { get; set; }
        public long size { get; set; }
        public long date { get; set; }
        public bool isFavorite { get; set; }

        public Guid GetAlbumId()
        {
            return Guid.Parse(album);
        }
        public Guid GetPlaceId()
        {
            return Guid.Parse(place);
        }
        public ImageData GetImageData()
        {
            var data = new ImageData()
            {
                FileName = fileName,
                MimeType = MIMEType,
                Data = Convert.FromBase64String(base64),
                Size = size,
                DateTaken = (new DateTime(1970, 1, 1)).AddMilliseconds(date)
        };
            return data;
        }
    }
}
