using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace uPhotoNG.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddedIsSystemPlace : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Albums_Users_OwnerId",
                table: "Albums");

            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Users_OwnerId",
                table: "Photos");

            migrationBuilder.DropForeignKey(
                name: "FK_Places_Users_CreatedBy",
                table: "Places");

            migrationBuilder.AddColumn<bool>(
                name: "IsSystemPlace",
                table: "Places",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Albums_Users_OwnerId",
                table: "Albums",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Users_OwnerId",
                table: "Photos",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Places_Users_CreatedBy",
                table: "Places",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Albums_Users_OwnerId",
                table: "Albums");

            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Users_OwnerId",
                table: "Photos");

            migrationBuilder.DropForeignKey(
                name: "FK_Places_Users_CreatedBy",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "IsSystemPlace",
                table: "Places");

            migrationBuilder.AddForeignKey(
                name: "FK_Albums_Users_OwnerId",
                table: "Albums",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Users_OwnerId",
                table: "Photos",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Places_Users_CreatedBy",
                table: "Places",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
