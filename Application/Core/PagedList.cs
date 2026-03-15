namespace Application.Core;

public class PagedList<T, TCursor>
{
    public List<T> Items { get; set; } = new();
    public TCursor? NextCursor { get; set; }
    public int TotalCount { get; set; } 
}
