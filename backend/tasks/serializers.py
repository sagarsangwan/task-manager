from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    status = serializers.ReadOnlyField()

    class Meta:
        model = Task
        fields = "__all__"
