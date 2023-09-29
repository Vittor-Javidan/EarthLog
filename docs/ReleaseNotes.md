// Before any commit, use the command line: tsc --noEmit

# 0.1.2.30 Cache optimization

- Now cache is not fully load for each modification. All add functionallity add the new data direcly into the cache. Deletion actions still loading the full cache.