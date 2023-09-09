# templatetags/custom_filters.py
from django import template

register = template.Library()

@register.filter
def get_data_by_column(item, column):
    # Implement the logic to retrieve data for the given column
    field_name = f"data_{column.id}"
    return getattr(item, field_name)
