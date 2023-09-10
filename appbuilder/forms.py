# forms.py
from .models import TableRelationship
from django import forms


class DynamicForm(forms.Form):
    def __init__(self, *args, data_frame=None, **kwargs):
        super(DynamicForm, self).__init__(*args, **kwargs)

        if data_frame is not None:
            for column in data_frame.columns:
                field_name = column.replace(' ', '_').lower()
                self.fields[field_name] = forms.CharField(label=column, required=False)


class UploadFileForm(forms.Form):
    files = forms.FileField(required=False)


class DatabaseImportForm(forms.Form):
    database_file = forms.FileField()
    host = forms.CharField(max_length=100, required=False)
    username = forms.CharField(max_length=100, required=False)
    password = forms.CharField(widget=forms.PasswordInput, required=False)





class TableRelationshipForm(forms.ModelForm):
    class Meta:
        model = TableRelationship
        fields = ['table1', 'column1', 'table2', 'column2', 'relationship_type']

