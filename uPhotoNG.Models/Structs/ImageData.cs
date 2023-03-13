namespace uPhotoNG.Models.Structs
{
    public struct ImageData
    {
        public string FileName { get; set; }
        public string MimeType { get; set; }
        public byte[] Data { get; set; }
        public int Size { get; set; }
        public DateTime DateTaken { get; set; }
    }
}
