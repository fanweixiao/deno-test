import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

var a = 1

serve((req) => {
  const upgrade = req.headers.get("upgrade") || "";
  if (upgrade.toLowerCase() != "websocket") {
    return new Response("request isn't trying to upgrade to websocket.");
  }
  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.onopen = () => console.log("socket opened" + Deno.env.get("KKK"));
  socket.onmessage = (e) => {
    console.log("socket message:", Deno.inspect(e.data));
    socket.send("***" + ++a + "*** " + new Date().toString());
  };
  socket.onerror = (e) => console.log("socket errored:", e.message);
  socket.onclose = () => console.log("socket closed.");
  return response;
});

console.log("Listening on http://localhost:8000");
