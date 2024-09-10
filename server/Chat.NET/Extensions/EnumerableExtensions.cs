namespace Extensions
{
    public static class EnumerableExtensions
    {
        /// <summary>
        /// Checks whether <paramref name="value"/> is contained within the collection
        /// as a substring.
        /// </summary>
        /// <param name="collection"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool PartiallyContains(this IEnumerable<string> collection, string value)
        {
            foreach (string item in collection)
            {
                if (item.Contains(value))
                {
                    return true;
                }
            }

            return false;
        }
    }
}
