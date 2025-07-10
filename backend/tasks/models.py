from django.db import models
from django.utils import timezone


class Task(models.Model):
    PRIORITY_CHOICES = [
        ("Low", "Low"),
        ("Medium", "Medium"),
        ("High", "High"),
        ("Critical", "Critical"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    deadline = models.DateTimeField()
    is_completed = models.BooleanField(default=False)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, blank=True)

    @property
    def status(self):
        if self.is_completed:
            return "Completed"
        elif self.deadline < timezone.now():
            return "Missed"
        return "Upcoming"

    def __str__(self):
        return self.title
