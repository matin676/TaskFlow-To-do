import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./todoSlice";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Plus } from "lucide-react";

export function AddTodoForm() {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(addTodo(text, priority, tags));
    setText("");
    setTags([]);
    setPriority("medium");
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <div className="flex gap-3">
        <Input
          type="text"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-transparent border-none text-lg placeholder:text-muted-foreground/50 focus-visible:ring-0 px-0 shadow-none h-auto py-2"
        />
        <Button
          size="icon"
          type="submit"
          className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 shrink-0 transition-transform active:scale-95"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs pt-2 border-t border-dashed border-border/60">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground font-medium">Priority</span>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-secondary/50 border-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer hover:bg-secondary text-foreground"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="w-[1px] h-4 bg-border/80"></div>

        <div className="flex items-center gap-2 flex-1 relative overflow-hidden">
          <div className="flex flex-wrap gap-1.5 items-center">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-violet-100 text-violet-700 border border-violet-200 text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 font-medium"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => setTags(tags.filter((t) => t !== tag))}
                  className="hover:text-red-500 transition-colors"
                >
                  &times;
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder="+ Add tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="bg-transparent border-none text-xs focus:ring-0 placeholder:text-muted-foreground/60 w-24 p-0 h-auto"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
