// what we did before optional chaining:
const streetName = user && user.address && user.address.street.name;

// what we can do now:
const streetName = user?.address?.street?.name;

// this will run even if options is undefined (in which case, onSuccess would be undefined as well)
// however, it will still fail if options was never declared,
// since optional chaining cannot be used on a non-existent root object.
// optional chaining does not replace checks like if (typeof options == "undefined")
const onSuccess = options?.onSuccess;

// this will run without error even if onSuccess is undefined (in which case, no function will be called)
onSuccess?.({ data: "yay" });

// and we can combine those things into a single line:
options?.onSuccess?.({ data: "yay" });

// and if you are 100% certain that onSuccess is a function if options exists
// then you don't need the extra ?. before calling it. Only use ?. in situations
// where the thing on the left might not exist.
options?.onSuccess({ data: "yay" });

// in React:
function UserProfile({ user }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <strong>{user.bio?.short ?? "No bio provided"}</strong>
    </div>
  );
}
