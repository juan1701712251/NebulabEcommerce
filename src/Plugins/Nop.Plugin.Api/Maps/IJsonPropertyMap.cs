﻿namespace Nop.Plugin.Api.Maps
{
    public interface IJsonPropertyMapper
    {
        Dictionary<string, Tuple<string, Type>> GetMap(Type type);
    }
}
