// Before any commit, use the command line: tsc --noEmit

# 0.1.2.19 Reusable components optimization

- All resusable components are now using the "memo" hook. because they are just a vessel for data anyways. The same was not done with local components of screen or any not reusable component, unless need for animation reasons.