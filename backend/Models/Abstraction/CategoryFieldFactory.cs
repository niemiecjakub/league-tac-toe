using LeagueChampions.Models.Dto;
using LeagueChampions.Models.ValueObjects;

namespace LeagueChampions.Models.Abstraction
{
  public class CategoryFieldFactory
  {

    public static IEnumerable<CategoryField> Create(MetaFilterDto filter)
    {
      return filter.Options.Select(opt =>
      {
        if (opt is MetaFilterOptioRationDto ratioOption)
        {
          var displayName = $"{ratioOption.Name} {ratioOption.Treshold}%";
          return new CategoryFieldTreshold(filter.Name, ratioOption.Name, ratioOption.Treshold, displayName);
        }
        return new CategoryField(filter.Name, opt.Name);
      });
    }

  }
}
