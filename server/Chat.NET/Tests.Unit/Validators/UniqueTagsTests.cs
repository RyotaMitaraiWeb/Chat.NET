using System.ComponentModel.DataAnnotations;
using Web.Validators;

namespace Tests.Unit.Validators
{
    public class UniqueTagsTests
    {
        public IEnumerable<string> ValidTags = new List<string>(["a", "b", "c"]);
        public IEnumerable<string> DuplicateTags = new List<string>(["a", "b", "b"]);
        public int NotATagCollection = 1;

        [Test]
        public void Test_ReturnsSuccessWhenTheCollectionHasOnlyUniqueValues()
        {
            var attribute = new UniqueTags();
            var context = new ValidationContext(this.ValidTags);

            var result = attribute.GetValidationResult(this.ValidTags, context);
            Assert.That(result, Is.EqualTo(ValidationResult.Success));
        }

        [Test]
        public void Test_ReturnsErrorWhenTheCollectionHasDuplicateValues()
        {
            var attribute = new UniqueTags();
            var context = new ValidationContext(this.DuplicateTags);

            var result = attribute.GetValidationResult(this.DuplicateTags, context);
            Assert.That(result, Is.Not.EqualTo(ValidationResult.Success));
        }

        [Test]
        public void Test_ReturnsErrorWhenTheValueIsNotACollection()
        {
            var attribute = new UniqueTags();
            var context = new ValidationContext(this.NotATagCollection);

            var result = attribute.GetValidationResult(this.NotATagCollection, context);
            Assert.That(result, Is.Not.EqualTo(ValidationResult.Success));
        }
    }
}
