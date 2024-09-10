using Common.ErrorMessages;
using System.ComponentModel.DataAnnotations;

namespace Web.ViewModels.ValidationAttributes
{
    /// <summary>
    /// Performs a case insensitive check as to whether the collection of tags contains
    /// duplicate values. Tags should not have duplicate values.
    /// </summary>
    public class UniqueTags : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is not IEnumerable<string> tags)
            {
                return new ValidationResult("Tags must be provided as an enumerable of strings");
            }

            IEnumerable<string> normalizedTags = tags.Select(t => t.ToUpper());
            bool onlyUniqueTags = normalizedTags.Distinct().Count() == normalizedTags.Count();

            if (onlyUniqueTags)
            {
                return ValidationResult.Success;
            }

            return new ValidationResult(ChatRoomErrorMessages.Tags.ContainDuplicateValues);
        }
    }
}
