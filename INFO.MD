## Redux State Management

### Selectors

#### Why use Selectors rather than directly get the state in the connect function?
- Think of State as a `DB`
- Selectors can be seen as `SELECT` queries

E.g
- A list of items in state, but we want to show a filtered list of some kind
- Filtering the list store and saving it in Redux is no good
- You can do this filtering in the Selector

**Why not just do data transform in component?**
- This makes component more coupled to Redux and less generic / useable
- Nicer to keep selectors closer to reducer as they operate on same state
- If state schema changes, easier to change the relevant selector

**Peformance**
- mapStateToProps is used often, so this is where `reselect` library can be useful
- The selectors made with `createSelector` will be memoized and avoid recalculations
- Couple this with `memoizing` the components for Speeeeed