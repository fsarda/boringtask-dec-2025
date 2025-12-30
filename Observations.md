# Solution

# Approach taken

Being a small(ish) application the following decisions were made:

- Use a simple state management combining `useReducer` and `context`. This approach has cons and pros, is not scalable for big applications but very simple and good enough for small state apps
- Picked shadcn theming and component library to play a bit as first time using it. Worked well for what was needed, some good base components and easy composition to build components closer to business need
- Decided to add a GET endpoint for orders, tho ended up using from memory. In the first versions of the app i could see orders polling from backend
- As we are mocking backend, took advantage of that to share business types
- Used ag-grid for simplicity for blotter. In case of building our own table, I would implement a different state shape to hash orders per market and the side

# Improvement opportunities

- Left several TODO's with comments on things i would put more effort in. Not proud of using `any` type in the app reducer but did not have time to get to the bottom of the types issues
- Use correctly selectors to avoid unnecessary re-renderings
- Move market and price components to the header as they rule the blotter and the form
- Toasts with notification handling result of failing orders (tho right now, none will fail)
 
