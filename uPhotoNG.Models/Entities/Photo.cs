﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using uPhotoNG.Models.Structs;
using uPhotoNG.Models.Intersections;

namespace uPhotoNG.Models.Entities
{
    public class Photo
    {
        [Key]
        [Column(TypeName = "char(36)")]
        public Guid Id { get; set; }

        [Required]
        [ForeignKey("User")]
        public Guid OwnerId { get; set; }
        public User? User { get; set; }

        [Required]
        public string FileName { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public bool IsFavorite { get; set; }

        [Required]
        [Column(TypeName = "varchar(10)")]
        public string MimeType { get; set; }

        [Required]
        public int Size { get; set; }

        [Required]
        public byte[] Data { get; set; }

        [Required]
        public DateTime DateTaken { get; set; }

        [Required]
        public DateTime DateUploaded { get; set; }


        public Photo(string title, bool isFavorite, string fileName, string mimeType, byte[] data, int size, DateTime dateTaken)
        {
            Id = Guid.NewGuid();
            DateUploaded = DateTime.UtcNow;

            FileName = fileName;
            Title = title;
            IsFavorite = isFavorite;
            MimeType = mimeType;
            Size = size;
            Data = data;
            DateTaken = dateTaken;
        }

        public Photo(string title, bool isFavorite, ImageData imageData)
        {
            Id = Guid.NewGuid();
            DateUploaded = DateTime.UtcNow;

            Title = title;
            IsFavorite = isFavorite;
            FileName = imageData.FileName;
            MimeType = imageData.MimeType;
            Size = imageData.Size;
            Data = imageData.Data;
            DateTaken = imageData.DateTaken;
        }
    }
}