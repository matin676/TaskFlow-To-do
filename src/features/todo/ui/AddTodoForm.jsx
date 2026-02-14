import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../model/todoSlice";
import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";
import { Plus, Tag, HelpCircle, X } from "lucide-react";
import { cn } from "../../../shared/lib/cn";
import { motion, AnimatePresence } from "framer-motion";

export function AddTodoForm() {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(addTodo({ text, priority, tags }));
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
    <form onSubmit={handleSubmit} className="relative z-10 group">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-card/80 backdrop-blur-xl border shadow-lg rounded-2xl p-1.5 transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:shadow-xl">
        <div className="flex items-center gap-2 p-2">
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
            <Plus className="w-5 h-5" />
          </div>
          <Input
            type="text"
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 text-base h-auto py-2 px-0 placeholder:text-muted-foreground/60 font-medium"
          />
          <Button
            size="sm"
            type="submit"
            disabled={!text.trim()}
            className="rounded-xl px-4 transition-all active:scale-95"
          >
            Add
          </Button>
        </div>

        {/* Expanded Controls (Visible when typing or always for now to keep it simple but cleaner) */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="px-2 pb-2 overflow-hidden"
        >
          <div className="h-[1px] w-full bg-border/50 mb-3" />

          <div className="flex flex-wrap items-center gap-4 text-xs">
            {/* Priority Selector */}
            <div className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-lg">
              <span className="text-muted-foreground font-medium">
                Priority:
              </span>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="bg-transparent border-none p-0 text-xs font-semibold focus:ring-0 cursor-pointer text-foreground"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <div className="flex flex-wrap gap-1.5">
                <AnimatePresence>
                  {tags.map((tag) => (
                    <motion.span
                      key={tag}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100 font-medium"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => setTags(tags.filter((t) => t !== tag))}
                        className="hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Tag className="w-3.5 h-3.5" />
                <input
                  type="text"
                  placeholder="Type tag & enter..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="bg-transparent border-none text-xs focus:ring-0 p-0 placeholder:text-muted-foreground/50 w-28"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </form>
  );
}
