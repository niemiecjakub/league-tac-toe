"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { submitFeedback } from "@/services/feedbackService";
import { FeedbackRequest } from "@/models/Feedback";

interface FeedbackProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function Feedback({ open, onOpenChange }: FeedbackProps) {
    const { theme } = useTheme();
    const t = useTranslations("feedback");
    const [sender, setSender] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFeedbackSubmit = async () => {
        if (message.trim().length === 0) {
            return;
        }

        setIsSubmitting(true);
        try {
            const feedbackRequest: FeedbackRequest = {
                sender: sender.trim() || null,
                message: message.trim(),
            };
            const success = await submitFeedback(feedbackRequest);
            
            if (success) {
                toast.success(t("successToast"), {
                    theme: theme,
                });
                
                setSender("");
                setMessage("");
                onOpenChange(false);
            } else {
                toast.error(t("errorToast"), {
                    theme: theme,
                });
            }
        } catch {
            toast.error(t("errorToast"), {
                theme: theme,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFeedbackCancel = () => {
        setSender("");
        setMessage("");
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("title")}</DialogTitle>
                    <DialogDescription>
                        {t("description")}
                    </DialogDescription>
                </DialogHeader>
                
                <div className="flex flex-col gap-4 py-2 min-w-0">
                    <Field>
                        <FieldLabel htmlFor="sender">
                            {t("nameEmailLabel")}
                        </FieldLabel>
                        <Input
                            id="sender"
                            type="text"
                            placeholder=""
                            value={sender}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= 200) {
                                    setSender(value);
                                }
                            }}
                            maxLength={200}
                            className="w-full min-w-0"
                        />
                    </Field>
                    
                    <Field>
                        <FieldLabel htmlFor="textarea-message">
                            {t("messageLabel")} <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Textarea
                            id="textarea-message"
                            placeholder={t("messagePlaceholder")}
                            value={message}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= 5000) {
                                    setMessage(value);
                                }
                            }}
                            maxLength={5000}
                            rows={10}
                            className="w-full min-w-0 resize-none overflow-y-auto"
                            required
                        />
                        <FieldDescription>
                            {t("characterCount", { count: message.length })}
                        </FieldDescription>
                    </Field>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={handleFeedbackCancel}
                        disabled={isSubmitting}
                    >
                        {t("cancel")}
                    </Button>
                    <Button
                        onClick={handleFeedbackSubmit}
                        disabled={message.trim().length === 0 || isSubmitting}
                    >
                        {isSubmitting ? t("sending") : t("send")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
